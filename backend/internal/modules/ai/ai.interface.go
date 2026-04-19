package ai

type AiService interface {
	GetResponseFromAI(userPrompt string, history []string) (any, error)
}
