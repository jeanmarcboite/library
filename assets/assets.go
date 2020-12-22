package assets

import (
	"github.com/gobuffalo/packr/v2"
)

// Templates -- html templates
var Templates = packr.New("templates", "./templates")
var Config = packr.New("config", "./config")
