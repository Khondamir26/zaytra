import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Store } from "lucide-react"
import Link from "next/link"

export function VendorLoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="ring-2 ring-accent/ shadow-xl bg-card text-card-foreground">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Store size={24} className="text-primary" />
          </div>
          <CardTitle className="text-xl">Vendor Account Login</CardTitle>
          <CardDescription>
            Access your vendor dashboard and manage your products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    className="rounded-full"
                    id="email"
                    type="email"
                    placeholder="vendor@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <div className="relative">
                    <Input
                      className="rounded-full pr-10"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>

                <Button type="submit" className="rounded-full w-full cursor-pointer transition-transform duration-200">
                  Login to Vendor Account
                </Button>
              </div>

              <div className="text-center text-sm">
                Don&apos;t have a vendor account?{" "}
                <Link href="/vendor/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <Link href="/login" className="underline underline-offset-4 hover:text-foreground">
                  ← Back
                </Link>
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