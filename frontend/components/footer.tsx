import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Instagram, Facebook, Twitter, Mail, Heart } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12 md:py-16">
      <div className="container max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h5 className="font-semibold text-lg text-white mb-4">Company</h5>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-lg text-white mb-4">Contact</h5>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Partner with us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Ride with us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-lg text-white mb-4">Legal</h5>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Refund & Cancellation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-lg text-white mb-4">Follow Us</h5>
            <div className="flex space-x-4 mb-4">
              <Link href="#" aria-label="Instagram" className="hover:text-white transition-colors">
                <Instagram />
              </Link>
              <Link href="#" aria-label="Facebook" className="hover:text-white transition-colors">
                <Facebook />
              </Link>
              <Link href="#" aria-label="Twitter" className="hover:text-white transition-colors">
                <Twitter />
              </Link>
            </div>
            <h5 className="font-semibold text-lg text-white mb-2">Receive exclusive offers in your mailbox</h5>
            <form className="flex space-x-2">
              <div className="relative flex-grow">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Enter Your email"
                  className="pl-10 w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 h-11"
                />
              </div>
              <Button type="submit" className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-md h-11">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; Your Company, 2021. All rights Reserved</p>
          <p className="flex items-center mt-2 sm:mt-0">
            Made with <Heart className="w-4 h-4 mx-1 text-yellow-400 fill-yellow-400" /> by Themewagon
          </p>
        </div>
      </div>
    </footer>
  )
}
