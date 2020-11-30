module github.com/jeanmarcboite/library

go 1.15

replace github.com/jeanmarcboite/epub => ../epub

replace github.com/jeanmarcboite/books => ../books

require (
	github.com/jeanmarcboite/books v0.0.0-00010101000000-000000000000
	github.com/jeanmarcboite/epub v0.0.0-00010101000000-000000000000
	github.com/jeanmarcboite/librarytruc v0.0.0-20201129183928-0b5142a38fe3 // indirect
	github.com/mitchellh/go-homedir v1.1.0
	github.com/rs/zerolog v1.20.0
	github.com/spf13/cobra v1.1.1
	github.com/spf13/viper v1.7.1
)
