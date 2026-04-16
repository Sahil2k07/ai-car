package configs

import (
	"os"
	"path/filepath"
	"sync"

	"github.com/BurntSushi/toml"
)

type appConfig struct {
	Server serverConfig `toml:"server"`
	// include more here
}

var (
	globalConfig appConfig
	once         sync.Once
)

func IsProduction() bool {
	env := os.Getenv("APP_ENV")
	return env == "PRODUCTION" || env == "STAGING"
}

func loadProdConfig() {
	globalConfig = appConfig{
		Server: loadProdServerConfig(),
	}
}

func loadDevConfig() {
	path, err := filepath.Abs("dev.toml")
	if err != nil {
		panic("failed to find config file path: " + err.Error())
	}

	if _, err := toml.DecodeFile(path, &globalConfig); err != nil {
		panic("failed to decode config file: " + err.Error())
	}
}

func LoadConfig() appConfig {
	once.Do(func() {
		if IsProduction() {
			loadProdConfig()
		} else {
			loadDevConfig()
		}
	})

	return globalConfig
}
