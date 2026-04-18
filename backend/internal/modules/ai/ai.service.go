package ai

type aiService struct{}

func NewAiService() AiService {
	return &aiService{}
}
