import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export default function Login() {
  return (
    <main className="container flex flex-col h-screen justify-center">
      <h1 className="text-teal-300 font-bold leading-none text-lg mb-10">
        Login to
        <strong className="block text-gray-800 text-2xl">life mess app</strong>
      </h1>
      <form className="flex flex-col gap-y-4">
        <Input autoFocus type="email" id="email" placeholder="email" />
        <Input type="password" id="password" placeholder="password" />
        <Button title="Login" size="lg" type="submit">Login</Button>
      </form>
    </main>
  )
}
