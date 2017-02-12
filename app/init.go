package app

import (
	"github.com/revel/revel"
	"github.com/tarantool/go-tarantool"
	"time"
)

var Tarantool *tarantool.Connection

func InitDB() {
	opts := tarantool.Opts{
		Timeout:       500 * time.Millisecond,
		Reconnect:     1 * time.Second,
		MaxReconnects: 3,
		User: "guest",
		//Pass: "test",
	}

	var err error
	Tarantool, err = tarantool.Connect("163.172.131.93:3301", opts)
	if err != nil {
		revel.INFO.Fatalf("Failed to connect: %s", err.Error())
	}
	revel.INFO.Println("DB Connected")

	resp, err := Tarantool.Ping()
	revel.INFO.Println(resp.Code)
	revel.INFO.Println(resp.Data)
	revel.INFO.Println(err)

	// run raw lua code
	//resp, err = Tarantool.Eval("return 1 + 2", []interface{}{})
	//revel.INFO.Println("Eval")
	//revel.INFO.Println("Error", err)
	//revel.INFO.Println("Code", resp.Code)
	//revel.INFO.Println("Data", resp.Data)
}

func init() {
	// Filters is the default set of global filters.
	revel.Filters = []revel.Filter{
		revel.PanicFilter,             // Recover from panics and display an error page instead.
		revel.RouterFilter,            // Use the routing table to select the right Action
		revel.FilterConfiguringFilter, // A hook for adding or removing per-Action filters.
		revel.ParamsFilter,            // Parse parameters into Controller.Params.
		revel.SessionFilter,           // Restore and write the session cookie.
		revel.FlashFilter,             // Restore and write the flash cookie.
		revel.ValidationFilter,        // Restore kept validation errors and save new ones from cookie.
		revel.I18nFilter,              // Resolve the requested language
		HeaderFilter,                  // Add some security based headers
		revel.InterceptorFilter,       // Run interceptors around the action.
		revel.CompressFilter,          // Compress the result.
		revel.ActionInvoker,           // Invoke the action.
	}

	// register startup functions with OnAppStart
	// ( order dependent )
	revel.OnAppStart(InitDB)
	// revel.OnAppStart(FillCache)
}

// TODO turn this into revel.HeaderFilter
// should probably also have a filter for CSRF
// not sure if it can go in the same filter or not
var HeaderFilter = func(c *revel.Controller, fc []revel.Filter) {
	// Add some common security headers
	c.Response.Out.Header().Add("X-Frame-Options", "SAMEORIGIN")
	c.Response.Out.Header().Add("X-XSS-Protection", "1; mode=block")
	c.Response.Out.Header().Add("X-Content-Type-Options", "nosniff")

	fc[0](c, fc[1:]) // Execute the next filter stage.
}
