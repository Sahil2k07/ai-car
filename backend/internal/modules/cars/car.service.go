package cars

type carService struct{}

func NewCarService() CarService {
	return &carService{}
}

func (cs *carService) GetCars() (any, error) {
	return []map[string]any{
		{
			"id":       "aether-one",
			"name":     "Aether One",
			"type":     "Sedan",
			"tagline":  "Grace in motion",
			"priceUSD": 89000,
			"color":    "#C8A96E",
			"imageUrl": "/aether-one.png",
			"specs": map[string]any{
				"range":        "520 km",
				"acceleration": "3.8s",
				"topSpeed":     "240 km/h",
				"seats":        5,
			},
			"features": []string{
				"Adaptive AI Suspension",
				"Panoramic Glass Roof",
				"Neural Drive Assist",
				"Ambient Interior Lighting",
			},
		},
		{
			"id":       "aether-apex",
			"name":     "Aether Apex",
			"type":     "SUV",
			"tagline":  "Commanding every horizon",
			"priceUSD": 124000,
			"color":    "#7BA7BC",
			"imageUrl": "/aether-apex.png",
			"specs": map[string]any{
				"range":        "610 km",
				"acceleration": "4.2s",
				"topSpeed":     "210 km/h",
				"seats":        7,
			},
			"features": []string{
				"Terrain Intelligence System",
				"Quad-Zone Climate",
				"Air Suspension",
				"Off-Road Mode",
			},
		},
		{
			"id":       "aether-volta",
			"name":     "Aether Volta",
			"type":     "Coupe",
			"tagline":  "Pure electric soul",
			"priceUSD": 156000,
			"color":    "#9B8DBF",
			"imageUrl": "/aether-volta.png",
			"specs": map[string]any{
				"range":        "480 km",
				"acceleration": "2.6s",
				"topSpeed":     "280 km/h",
				"seats":        4,
			},
			"features": []string{
				"Track Mode",
				"Carbon Fibre Body",
				"Magnetic Ride Control",
				"Launch Control",
			},
		},
		{
			"id":       "aether-terra",
			"name":     "Aether Terra",
			"type":     "SUV",
			"tagline":  "Wilderness, refined",
			"priceUSD": 108000,
			"color":    "#7BA885",
			"imageUrl": "/aether-terra.png",
			"specs": map[string]any{
				"range":        "670 km",
				"acceleration": "5.1s",
				"topSpeed":     "195 km/h",
				"seats":        6,
			},
			"features": []string{
				"Solar Roof Charging",
				"4WD Pro System",
				"Camp Mode",
				"Tow Assist 3500kg",
			},
		},
	}, nil
}
