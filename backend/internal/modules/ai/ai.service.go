package ai

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/Sahil2k07/ai-car/internal/configs"
	"github.com/Sahil2k07/ai-car/internal/utils"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

type aiService struct{}

func NewAiService() AiService {
	return &aiService{}
}

func (a *aiService) GetResponseFromAI(userPrompt string, history []string) (any, error) {
	ctx := context.Background()

	apiKey := configs.GetGeminiConfig().ApiKey
	if apiKey == "" {
		return nil, fmt.Errorf("missing ai configs")
	}

	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		return nil, err
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-2.5-flash-lite")
	model.ResponseMIMEType = "application/json"

	prompt := utils.GeneratePrompt(userPrompt, history)

	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return nil, err
	}

	// Extract text response
	if len(resp.Candidates) == 0 || len(resp.Candidates[0].Content.Parts) == 0 {
		return nil, fmt.Errorf("empty response from Gemini")
	}

	textPart, ok := resp.Candidates[0].Content.Parts[0].(genai.Text)
	if !ok {
		return nil, fmt.Errorf("invalid response format")
	}

	raw := string(textPart)

	// Parse JSON safely
	var parsed map[string]any
	err = json.Unmarshal([]byte(raw), &parsed)
	if err != nil {
		return nil, fmt.Errorf("failed to parse AI response: %v, raw: %s", err, raw)
	}

	return parsed, nil
}
