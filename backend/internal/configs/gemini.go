package configs

import (
	"os"
)

type geminiConfig struct {
	ApiKey string `toml:"api_key"`
}

func loadProdGeminiConfig() geminiConfig {
	return geminiConfig{
		ApiKey: os.Getenv("API_KEY"),
	}
}

func GetGeminiConfig() geminiConfig {
	return geminiConfig{
		ApiKey: globalConfig.Gemini.ApiKey,
	}
}
