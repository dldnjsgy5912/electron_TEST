module.exports = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: `http://18.220.202.163:8888/api/web/:path*`,
  //     },
  //   ];
  // },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = "electron-renderer";
    }

    return config;
  },
  env: {
    NEXT_PUBLIC_SERVER_URL: "https://api.plasticnara.com/api/web",
    NEXT_PUBLIC_SERVER_URLS: "http://18.220.202.163:8888/api/web",
  },
};
