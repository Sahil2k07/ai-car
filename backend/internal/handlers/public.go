package handlers

import (
	"github.com/Sahil2k07/ai-car/internal/modules/ai"
	"github.com/Sahil2k07/ai-car/internal/modules/cars"
	"github.com/labstack/echo/v4"
)

func HandlePublicEndpoints(g *echo.Group) {
	carService := cars.NewCarService()
	aiService := ai.NewAiService()

	cars.NewCarHandler(g, carService)
	ai.NewAiHandler(g, aiService)
}
