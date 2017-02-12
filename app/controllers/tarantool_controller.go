package controllers

import (
	"github.com/revel/revel"
	"github.com/tarantool/go-tarantool"
	"github.com/kllakk/revel.template/app"
)

type TarantoolController struct {
	*revel.Controller
}

type JsonResponse struct {
	Success bool	    `json:"success"`
	Code   	uint32      `json:"code"`
	Data    interface{} `json:"data"`
	Error   string      `json:"error"`
}

func (c TarantoolController) GetTesters() revel.Result {

	response := JsonResponse{}

	resp, err := app.Tarantool.Select("tester3", "primary", 0, 1000, tarantool.IterGt, []interface{}{uint(0)})
	if err != nil {
		//revel.INFO.Fatalf("Failed to connect: %s", err.Error())
		response.Error = err.Error()
		return c.RenderJson(response)
	}

	response.Success = true
	response.Data = resp.Data
	response.Code = resp.Code

	return c.RenderJson(response)
}
