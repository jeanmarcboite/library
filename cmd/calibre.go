package cmd

import (
	"fmt"

	"os"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"

	"github.com/jeanmarcboite/books/models/calibre"
	"github.com/spf13/cobra"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// reads calibre metadata
var calibreCmd = &cobra.Command{
	Use:   "calibre",
	Short: "Open calibre database",
	Long:  "parse calibre db",
	Run: func(cmd *cobra.Command, args []string) {
		log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})

		log.Debug().Str("args", fmt.Sprint(args)).Msg("ls")

		debug, _ := cmd.Flags().GetBool("debug")

		for _, filename := range args {
			db, err := gorm.Open(sqlite.Open(filename), &gorm.Config{})
			if err != nil {
				panic("failed to connect database")
			}
			var books []calibre.Book
			booksk := make(map[uint]int)

			if result := db.Find(&books); result.Error != nil {
				if debug {
					fmt.Printf("%+v\n", result)
				}
			}
			for row, book := range books {
				booksk[book.ID] = row
			}
			var comments []calibre.Comment
			if result := db.Find(&comments); result.Error != nil {
				fmt.Printf("%+v\n", result)
			} else {
				for _, comment := range comments {
					books[booksk[comment.Book]].Comment = comment.Text
				}
			}

			fmt.Println("{}", books)

			for _, v := range booksk {
				fmt.Printf("%+v\n", books[v])
			}
		}
	},
}
