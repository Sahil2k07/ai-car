package main

import (
	"github.com/Sahil2k07/ai-car/internal/configs"
	"github.com/Sahil2k07/ai-car/internal/handlers"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	configs := configs.LoadConfig()

	e := echo.New()

	e.Use(middleware.Recover())
	e.Use(middleware.RequestLogger())
	e.Use(middleware.RateLimiter(middleware.NewRateLimiterMemoryStore(20)))

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     configs.Server.Origins,
		AllowMethods:     []string{echo.GET, echo.POST, echo.PUT, echo.DELETE, echo.PATCH},
		AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
		AllowCredentials: true,
	}))

	public := e.Group("/api/public")
	handlers.HandlePublicEndpoints(public)

	e.Logger.Fatal(e.Start(configs.Server.ServerPort))
}
