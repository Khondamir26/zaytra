import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Store, Megaphone } from "lucide-react"
import Link from "next/link"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="ring-2 ring-accent/ shadow-xl bg-card text-card-foreground">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Choose your account type to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full w-full flex items-center gap-2 cursor-pointer transition-transform duration-200"
                >
                  <Link href="/vendor/login">
                    <Store size={18} />
                    Vendor Account Login
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full w-full flex items-center gap-2 cursor-pointer transition-transform duration-200"
                >
                  <Link href="/marketing/login">
                    <Megaphone size={18} />
                    Marketing Account Login
                  </Link>
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="/terms">Terms of Service</a>{" "}
        and <a href="/privacy">Privacy Policy</a>.
      </div>
    </div>
  )
}