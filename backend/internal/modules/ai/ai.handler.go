package ai

import (
	"net/http"

	"github.com/Sahil2k07/ai-car/internal/utils"
	"github.com/labstack/echo/v4"
)

type aiHandler struct {
	s AiService
}

func NewAiHandler(g *echo.Group, s AiService) *aiHandler {
	h := &aiHandler{s: s}

	g.POST("/ai", h.GetAiResponse)

	return h
}

func (h *aiHandler) GetAiResponse(c echo.Context) error {
	var body struct {
		Prompt  string   `json:"prompt"`
		History []string `json:"history"`
	}

	if err := c.Bind(&body); err != nil {
		return utils.HandleError(c, err)
	}

	g, err := h.s.GetResponseFromAI(body.Prompt, body.History)
	if err != nil {
		return utils.HandleError(c, err)
	}

	return c.JSON(http.StatusOK, g)
}
