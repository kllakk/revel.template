package tests

import (
	"github.com/revel/revel/testing"
	"github.com/kllakk/revel.template/app"
)

type AppTest struct {
	testing.TestSuite
}

func (t *AppTest) Before() {
	println("Set up")
}

func (t *AppTest) TestThatIndexPageWorks() {
	t.Get("/")
	t.AssertOk()
	t.AssertContentType("text/html; charset=utf-8")
}

func (t *AppTest) TestThatDBWorks() {
	resp,_ := app.Tarantool.Ping()
	t.AssertEqual(uint32(0), resp.Code)
}


func (t *AppTest) After() {
	println("Tear down")
}
