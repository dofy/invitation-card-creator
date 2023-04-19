module.exports = {
  apps: [
    {
      name: "invitation-card",
      script: "yarn start",
      instances: 1,
      autorestart: true,
      max_memory_restart: "1G",
      ignore_watch: ["public"],
      env: {
        PORT: 9201,
        watch: true,
        NODE_ENV: "development",
      },
      env_production: {
        PORT: 9200,
        watch: false,
        NODE_ENV: "production",
      },
    },
  ],
};
