package cars

import (
	"net/http"

	"github.com/Sahil2k07/ai-car/internal/utils"
	"github.com/labstack/echo/v4"
)

type carHandler struct {
	s CarService
}

func NewCarHandler(g *echo.Group, s CarService) *carHandler {
	h := &carHandler{s: s}

	g.GET("/car", h.GetCars)

	return h
}

func (h *carHandler) GetCars(c echo.Context) error {
	g, err := h.s.GetCars()
	if err != nil {
		return utils.HandleError(c, err)
	}

	return c.JSON(http.StatusOK, g)
}
