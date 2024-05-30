/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		SERVER_URL: process.env.SERVER_URL,
		APP_URL: process.env.APP_URL
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'loremflickr.com',
				pathname: '**'
			},
			{
				protocol: 'https',
				hostname: 'www.aptronixindia.com',
				pathname: '**'
			}
		]
	}
}

export default nextConfig
