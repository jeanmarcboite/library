module github.com/jeanmarcboite/library

go 1.15

replace github.com/jeanmarcboite/epub => ../epub

replace github.com/jeanmarcboite/books => ../books

require (
	github.com/jeanmarcboite/books v0.0.0-00010101000000-000000000000
	github.com/jeanmarcboite/epub v0.0.0-00010101000000-000000000000
	github.com/jmoiron/sqlx v1.2.0 // indirect
	github.com/mattn/go-sqlite3 v1.14.5 // indirect
	github.com/mitchellh/go-homedir v1.1.0
	github.com/rs/zerolog v1.20.0
	github.com/spf13/cobra v1.1.1
	github.com/spf13/viper v1.7.1
)
