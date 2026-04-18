package ai

import "github.com/labstack/echo/v4"

type aiHandler struct {
	s AiService
}

func NewAiHandler(g *echo.Group, s AiService) *aiHandler {
	return &aiHandler{s: s}
}
