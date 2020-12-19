package cmd

import (
	"fmt"

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
		zerolog.SetGlobalLevel(zerolog.InfoLevel)
		if debug {
			zerolog.SetGlobalLevel(zerolog.DebugLevel)
		}

		log.Debug().Str("args", fmt.Sprint(args)).Msg("calibre")

		for _, filename := range args {
			_, err := calibre.ReadDB(filename, debug)

			if err != nil {
				log.Error().Str("error", err.Error()).Msg("calibre")
			}
		}
	},
}

func init() {
	rootCmd.AddCommand(calibreCmd)
	calibreCmd.Flags().BoolP("debug", "d", false, "Print xml parsed to stdout")

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// serverCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// serverCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
