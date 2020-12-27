package cmd

import (
	"context"
	"fmt"
	"os/signal"
	"time"

	"os"
	"path/filepath"

	"net/http"

	"html/template"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"

	"github.com/gorilla/mux"
	"github.com/jeanmarcboite/books/models/calibre"
	"github.com/jeanmarcboite/library/assets"
	"github.com/knadh/koanf"
	"github.com/knadh/koanf/parsers/yaml"
	"github.com/knadh/koanf/providers/rawbytes"
	"github.com/spf13/cobra"
	"github.com/sqweek/dialog"
	"github.com/webview/webview"
)

var debug = false

type errorData struct {
	Title string
	Text  string
}

type AppInfo struct {
	Name    string
	Version string
}

func appInfo() AppInfo {
	return AppInfo{Name: Koanf.String("app.name"), Version: Koanf.String("app.version")}
}

func SelectEpub() string {
	filename, _ := dialog.File().Filter("Epub file", "epub").Load()

	return filename
}

func SelectCalibreDB() (calibre.CalibreDB, error) {
	db := calibre.CalibreDB{}
	dirname, err := dialog.Directory().Title("Load Calibre database").Browse()
	//filename, err := dialog.File().Filter("Calibre DB", "db").Load()
	if err != nil {
		return db, err
	}

	return calibre.ReadDB(filepath.Join(dirname, "metadata.db"), debug)
}

func LoadCalibreDB(filename string) (calibre.CalibreDB, error) {
	return calibre.ReadDB(filename, debug)
}

// gui webview
var guiCmd = &cobra.Command{
	Use:   "gui",
	Short: "Open GUI in webview",
	Long:  "GUI",
	Run: func(cmd *cobra.Command, args []string) {
		log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})
		// Default level for this example is info, unless debug flag is present
		debug, _ = cmd.Flags().GetBool("debug")
		zerolog.SetGlobalLevel(zerolog.InfoLevel)
		if debug {
			zerolog.SetGlobalLevel(zerolog.DebugLevel)
		}

		log.Debug().Str("args", fmt.Sprint(args)).Msg("gui")

		port, _ := cmd.Flags().GetInt("port")
		r := mux.NewRouter()
		r.HandleFunc("/", RootHandler)
		r.PathPrefix("/public/").Handler(http.StripPrefix("/public/",
			http.FileServer(http.Dir("./frontend/public"))))
		listenTo := fmt.Sprintf(":%d", port)
		url := "http://localhost" + listenTo
		fmt.Println("Listen to " + url)
		go runWebview(url)
		startHttpServer(listenTo, r)
		//err := http.ListenAndServe(listenTo, r)
		//log.Fatal().Err(err).Msg("gui")
	},
}

// Koanf -- Global koanf instance. Use . as the key path delimiter. This can be / or anything.
var Koanf = koanf.New(".")

func init() {
	conf, err := assets.Config.Find("gui.yaml")
	if err == nil {
		Koanf.Load(rawbytes.Provider(conf), yaml.Parser())
		// fmt.Println(string(conf))
	}
}

func init() {
	rootCmd.AddCommand(guiCmd)
	guiCmd.Flags().BoolP("debug", "d", false, "Print debug info")
	guiCmd.Flags().IntP("port", "p", 8080, "port")

}

func RootHandler(w http.ResponseWriter, r *http.Request) {
	log.Debug().Msg("root handler")
	//w.Header().Set("Cache-Control", "no-cache")
	frontendTemplate, err := assets.Templates.Find("frontend.html")
	if err == nil {
		tmpl, errt := template.New("tmpl").Parse(string(frontendTemplate))
		if errt == nil {
			errt = tmpl.Execute(w, nil)
		}
		if errt != nil {
			fmt.Fprintf(w, "Error template: %s", errt.Error())
		}
	} else {
		errorTemplate, errt := assets.Templates.Find("error.html")

		if errt == nil {
			tmpl, errt := template.New("tmpl").Parse(string(errorTemplate))
			if errt == nil {
				errt = tmpl.Execute(w, errorData{Title: "Error", Text: err.Error()})
			}
			if errt != nil {
				fmt.Fprintf(w, "Error template: %s", err.Error())
			}
		} else {
			fmt.Fprintf(w, "Error loading page: %s", err.Error())
		}
	}
}

func runWebview(url string) {
	debug := true
	w := webview.New(debug)
	defer w.Destroy()
	w.SetTitle(appInfo().Name)
	w.SetSize(Koanf.Int("window.width"), Koanf.Int("window.height"), webview.HintNone)
	w.Bind("AppInfo", appInfo)
	w.Bind("SelectEpub", SelectEpub)
	w.Bind("SelectCalibreDB", SelectCalibreDB)
	w.Bind("LoadCalibreDB", LoadCalibreDB)
	w.Bind("quit", func() {
		w.Terminate()
	})

	w.Navigate(url)
	w.Run()
	//w.Destroy()
	log.Debug().Msg("That's all, folks")
}

// https://stackoverflow.com/questions/39320025/how-to-stop-http-listenandserve
func startHttpServer(addr string, handler http.Handler) error {
	srv := &http.Server{Addr: addr, Handler: handler}
	var err error = nil
	go func() {
		if err = srv.ListenAndServe(); err != nil {
			// handle err
			//log.Fatalf("ListenAndServe(): %v", err)
		}
	}()

	// Setting up signal capturing
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt)

	// Waiting for SIGINT (pkill -2)
	<-stop
	if err != nil {
		return fmt.Errorf("Server: %v", err.Error())
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err = srv.Shutdown(ctx); err != nil {
		return fmt.Errorf("Server shut down: %v", err.Error())
	}

	return nil
}
