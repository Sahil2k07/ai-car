# LEARNINGS.md

## Learnings

- It was the first time where I built a chatbot-like feature that could also control navigation and UI changes in a web application.

- I learned the importance of prompt engineering. While prompting, there were times when the model got confused due to unclear or inconsistent instructions, so I had to refine the prompt structure carefully.

- Choosing the right model mattered a lot. The model I used had a good balance between response quality and latency, which helped keep the experience smooth while still being intelligent enough for structured outputs.

---

## Changes I would make in a production system

- I would switch from strict JSON responses to a more token-efficient format (like tool/function calling or a lighter structured protocol), because JSON increases prompt size. At scale, even small token savings would significantly reduce cost.

- Instead of returning static or hardcoded data from the backend, I would integrate a proper database layer so that all car data, pricing, and metadata is dynamic and maintainable.

- I would use S3 (or a similar object storage) for images instead of keeping them in the public folder. This is because in a real-world system, the number of models and assets would grow, and managing them statically would not scale well.
