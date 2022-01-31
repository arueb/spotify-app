import { getProviders, signIn } from 'next-auth/react'

function Login({ providers }) {
  console.log('Providers', providers)

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black">
      <img
        className="mb-5 w-52"
        src="https://links.papareact.com/9xl"
        alt="Spotify Logo"
      />
      // map though the providers and render a button for each
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            className="rounded-lg bg-[#18D860] p-5 text-white"
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Login
export async function getServerSideProps() {
  // runs from the page is loaded from the server to get latest providers
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}