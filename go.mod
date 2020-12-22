module github.com/jeanmarcboite/library

go 1.15

replace github.com/jeanmarcboite/epub => ../epub

replace github.com/jeanmarcboite/books => ../books

require (
	github.com/go-extras/tahwil v1.0.0
	github.com/gobuffalo/packr/v2 v2.8.1
	github.com/gorilla/mux v1.8.0
	github.com/jeanmarcboite/books v0.0.0-00010101000000-000000000000
	github.com/jeanmarcboite/epub v0.0.0-00010101000000-000000000000
	github.com/mitchellh/go-homedir v1.1.0
	github.com/rs/zerolog v1.20.0
	github.com/spf13/cobra v1.1.1
	github.com/spf13/viper v1.7.1
	github.com/webview/webview v0.0.0-20200724072439-e0c01595b361
)
