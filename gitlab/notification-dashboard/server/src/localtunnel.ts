import localtunnel from 'localtunnel'
const port: number = parseInt(process.env.PORT as string, 10) || 3223

export default async function (): Promise<void> {
  const tunnel = await localtunnel({ port, subdomain: 'woss-gitlab-notifications' })
  // the assigned public url for your tunnel
  // i.e. https://abcdefgjhij.localtunnel.me
  console.log('Local tunnel ready on', tunnel.url)

  tunnel.url

  tunnel.on('close', () => {
    // tunnels are closed
    console.log('tunnel closed')
  })
}