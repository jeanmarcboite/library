package cmd

import (
	"encoding/json"
	"fmt"

	"github.com/go-extras/tahwil"

	"os"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"

	"github.com/jeanmarcboite/books/models/calibre"
	"github.com/spf13/cobra"
)

// reads calibre metadata
var calibreCmd = &cobra.Command{
	Use:   "calibre",
	Short: "Open calibre database",
	Long:  "parse calibre db",
	Run: func(cmd *cobra.Command, args []string) {
		log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})
		// Default level for this example is info, unless debug flag is present
		debug, _ := cmd.Flags().GetBool("debug")
		print_data, _ := cmd.Flags().GetBool("print")
		print_tahwil, _ := cmd.Flags().GetBool("tahwil")
		zerolog.SetGlobalLevel(zerolog.InfoLevel)
		if debug {
			zerolog.SetGlobalLevel(zerolog.DebugLevel)
		}

		log.Debug().Str("args", fmt.Sprint(args)).Msg("calibre")

		for _, filename := range args {
			calibreDB, err := calibre.ReadDB(filename, debug)

			if err != nil {
				log.Error().Str("error", err.Error()).Msg("calibre")
			} else {
				if print_data {
					fmt.Println(SprintJSON(calibreDB))
				}
				if print_tahwil {
					v, err := tahwil.ToValue(calibreDB)
					if err != nil {
						panic(err)
					}
					res, err := json.MarshalIndent(v, "", "   ")
					if err != nil {
						panic(err)
					}
					fmt.Println(string(res))
				}
			}
		}
	},
}

func SprintJSON(v interface{}) string {
	res, err := json.MarshalIndent(v, "", "   ")
	if err != nil {
		panic(err)
	}
	return string(res)
}

func init() {
	rootCmd.AddCommand(calibreCmd)
	calibreCmd.Flags().BoolP("debug", "d", false, "Print debug info")
	calibreCmd.Flags().BoolP("print", "p", false, "Print database parsed to stdout")
	calibreCmd.Flags().BoolP("tahwil", "t", false, "Print database parsed to stdout")

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// serverCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// serverCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
