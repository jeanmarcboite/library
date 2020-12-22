package cmd

import (
	"fmt"

	"os"

	"net/http"

	"html/template"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"

	"github.com/jeanmarcboite/library/assets"

	"github.com/gorilla/mux"
	"github.com/spf13/cobra"
	"github.com/webview/webview"
)

type errorData struct {
	Title string
	Text  string
}

// gui webview
var guiCmd = &cobra.Command{
	Use:   "gui",
	Short: "Open GUI in webview",
	Long:  "GUI",
	Run: func(cmd *cobra.Command, args []string) {
		log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})
		// Default level for this example is info, unless debug flag is present
		debug, _ := cmd.Flags().GetBool("debug")
		zerolog.SetGlobalLevel(zerolog.InfoLevel)
		if debug {
			zerolog.SetGlobalLevel(zerolog.DebugLevel)
		}

		log.Debug().Str("args", fmt.Sprint(args)).Msg("gui")

		port, _ := cmd.Flags().GetInt("port")
		r := mux.NewRouter()
		r.HandleFunc("/", RootHandler)
		listenTo := fmt.Sprintf(":%d", port)
		url := "http://localhost" + listenTo
		fmt.Println("Listen to " + url)
		go runWebview(url)
		err := http.ListenAndServe(listenTo, r)
		log.Fatal().Err(err).Msg("gui")
	},
}

func init() {
	rootCmd.AddCommand(guiCmd)
	guiCmd.Flags().BoolP("debug", "d", false, "Print debug info")
	guiCmd.Flags().IntP("port", "p", 8080, "port")

}

func RootHandler(w http.ResponseWriter, r *http.Request) {
	log.Debug().Msg("root handler")
	tpl, err := template.ParseFiles("public/index.html")
	log.Error().Str("err", err.Error()).Msg("execute")

	if err == nil {
		tpl.Execute(w, nil)
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
	w.SetTitle("Minimal webview example")
	w.SetSize(800, 600, webview.HintNone)
	w.Navigate(url)
	w.Run()
}
