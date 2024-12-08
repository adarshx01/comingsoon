'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Search } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const Navbar = ({ className }: { className?: string }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // const tech={
  //   title: "TechOrb",
  //   items: [
  //     { title: "Latest", href: "/", description: "Most recent tech developments" },
  //     { title: "Events", href: "/events", description: "Upcoming tech events" },
  //     { title: "Contact", href: "/contact", description: "Get in touch with us" },
  //     { title: "Reviews", href: "/reviews", description: "In-depth tech product reviews" },
  //     { title: "About", href: "/about", description: "Learn more about TechOrb" },
  //     { title: "AI", href: "/ai", description: "Artificial Intelligence" },
  //     { title: "Technology", href: "/technology", description: "Tech Ecosystem" },
  //     { title: "Coding", href: "/coding", description: "Development" },
  //     { title: "Security", href: "/security", description: "Cybersecurity"},
  //     { title: "Newsletters", href: "/newsletters", description: "Subscription Channels" },
  //     { title: "Tech Digest", href: "/newsletters/tech-digest", description: "Daily tech updates" },
  //     { title: "AI Weekly", href: "/newsletters/ai-weekly", description: "Artificial Intelligence roundup" },
  //     { title: "Startup Insider", href: "/newsletters/startup-insider", description: "Emerging business insights" },
  //     { title: "Coding Trends", href: "/newsletters/coding-trends", description: "Development industry news" },
  //     { title: "Security Brief", href: "/newsletters/security-brief", description: "Cybersecurity updates" }, 
  //     { title: "Chatbots", href: "/ai/chatbots", description: "Latest in conversational AI" },
  //     { title: "Machine Learning", href: "/ai/machine-learning", description: "Advanced ML techniques" },
  //     { title: "Computer Vision", href: "/ai/computer-vision", description: "Visual AI technologies" },
  //     { title: "Natural Language Processing", href: "/ai/nlp", description: "Language understanding AI" },
  //     { title: "AI Research", href: "/ai/research", description: "Cutting-edge AI innovations" },
  //     { title: "Tech Latest", href: "/tech/latest", description: "Most recent tech developments" },
  //     { title: "Gadgets", href: "/tech/gadgets", description: "New and innovative devices" },
  //     { title: "Reviews", href: "/tech/reviews", description: "In-depth tech product reviews" },
  //     { title: "Hardware", href: "/tech/hardware", description: "Latest hardware innovations" },
  //     { title: "Robotics", href: "/tech/robotics", description: "Robotics and automation" },
  //     { title: "Programming Languages", href: "/coding/languages", description: "Latest in coding technologies" },
  //     { title: "Web Development", href: "/coding/web", description: "Front-end and back-end trends" },
  //     { title: "Mobile Development", href: "/coding/mobile", description: "iOS and Android insights" },
  //     { title: "Open Source", href: "/coding/open-source", description: "Community-driven projects" },
  //     { title: "Developer Tools", href: "/coding/tools", description: "Productivity and development tools" },
  //     { title: "Cyber Threats", href: "/security/threats", description: "Latest security risks" },
  //     { title: "Privacy Tech", href: "/security/privacy", description: "Data protection technologies" },
  //     { title: "Network Security", href: "/security/network", description: "Infrastructure protection" },
  //     { title: "Encryption", href: "/security/encryption", description: "Advanced security methods" },
  //     { title: "Ethical Hacking", href: "/security/ethical-hacking", description: "Penetration testing insights" },
  //     { title: "Subscription Channels", href: "/newsletters/subscription-channels", description: "Subscription Channels" },
  //     { title: "AI", href: "/ai", description: "Artificial Intelligence" },
  //     { title: "Technology", href: "/technology", description: "Tech Ecosystem" },
  //     { title: "Coding", href: "/coding", description: "Development" },
  //     { title: "Security", href: "/security", description: "Cybersecurity" },
  //     { title: "Newsletters", href: "/newsletters", description: "Subscription Channels" },
  //   }
  // }
  // Detailed navigation categories
  const navigationCategories = {
    ai: [
      { 
        title: "Artificial Intelligence", 
        items: [
          { title: "Chatbots", href: "/ai/chatbots", description: "Latest in conversational AI" },
          { title: "Machine Learning", href: "/ai/machine-learning", description: "Advanced ML techniques" },
          { title: "Computer Vision", href: "/ai/computer-vision", description: "Visual AI technologies" },
          { title: "Natural Language Processing", href: "/ai/nlp", description: "Language understanding AI" },
          { title: "AI Research", href: "/ai/research", description: "Cutting-edge AI innovations" }
        ]
      }
    ],
    technology: [
      { 
        title: "Tech Ecosystem", 
        items: [
          { title: "Tech Latest", href: "/tech/latest", description: "Most recent tech developments" },
          { title: "Gadgets", href: "/tech/gadgets", description: "New and innovative devices" },
          { title: "Reviews", href: "/tech/reviews", description: "In-depth tech product reviews" },
          { title: "Hardware", href: "/tech/hardware", description: "Latest hardware innovations" },
          { title: "Robotics", href: "/tech/robotics", description: "Robotics and automation" }
        ]
      }
    ],
    coding: [
      { 
        title: "Development", 
        items: [
          { title: "Programming Languages", href: "/coding/languages", description: "Latest in coding technologies" },
          { title: "Web Development", href: "/coding/web", description: "Front-end and back-end trends" },
          { title: "Mobile Development", href: "/coding/mobile", description: "iOS and Android insights" },
          { title: "Open Source", href: "/coding/open-source", description: "Community-driven projects" },
          { title: "Developer Tools", href: "/coding/tools", description: "Productivity and development tools" }
        ]
      }
    ],
    security: [
      { 
        title: "Cybersecurity", 
        items: [
          { title: "Cyber Threats", href: "/security/threats", description: "Latest security risks" },
          { title: "Privacy Tech", href: "/security/privacy", description: "Data protection technologies" },
          { title: "Network Security", href: "/security/network", description: "Infrastructure protection" },
          { title: "Encryption", href: "/security/encryption", description: "Advanced security methods" },
          { title: "Ethical Hacking", href: "/security/ethical-hacking", description: "Penetration testing insights" }
        ]
      }
    ],
    // newsletters: [
    //   { 
    //     title: "Subscription Channels", 
    //     items: [
    //       { title: "Tech Digest", href: "/newsletters/tech-digest", description: "Daily tech updates" },
    //       { title: "AI Weekly", href: "/newsletters/ai-weekly", description: "Artificial Intelligence roundup" },
    //       { title: "Startup Insider", href: "/newsletters/startup-insider", description: "Emerging business insights" },
    //       { title: "Coding Trends", href: "/newsletters/coding-trends", description: "Development industry news" },
    //       { title: "Security Brief", href: "/newsletters/security-brief", description: "Cybersecurity updates" }
    //     ]
    //   }
    // ]
  };

  // Reusable ListItem component
  const ListItem = React.forwardRef<
    HTMLAnchorElement,
    React.AnchorHTMLAttributes<HTMLAnchorElement> & { title: string }
  >(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            {children && (
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
              </p>
            )}
          </a>
        </NavigationMenuLink>
      </li>
    );
  });
  ListItem.displayName = "ListItem";

  // Dropdown Menu Component (Shared between Desktop and Mobile)
  const CategoryDropdown = ({ 
    title, 
    items, 
    isMobile = false 
  }: { 
    title: string, 
    items: Array<{title: string, href: string, description: string}>, 
    isMobile?: boolean 
  }) => {
    if (isMobile) {
      return (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold ">{title}</h3>
          <div className='border-opacity-40  border-b-[1px] px-1 w-[36vw]'>
            {items.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="block py-1.5 text-sm hover:text-zinc-50"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      );
    }

    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger className="h-9 bg-transparent text-zinc-200 hover:bg-zinc-800">
          {title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 bg-white p-4 text-zinc-900 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            {items.map((item) => (
              <ListItem key={item.title} title={item.title} href={item.href}>
                {item.description}
              </ListItem>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  };

  return (
    <header className={cn("sticky top-10 z-50 w-full", className)}>
      <div className="container mx-auto">
        <div className="relative mx-4 flex h-16 items-center justify-between rounded-full bg-opacity-30 bg-neutral-700 px-4 text-sm font-medium text-zinc-200 shadow-lg backdrop-blur-md">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl">
              <img src="/originalLogo.png" alt="TechOrb Logo" className="absolute inset-0 object-cover " />
            </div>
            <span className="hidden text-xl font-bold sm:inline-block">
              TechOrb
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              {/* Home Link */}
              <NavigationMenuItem>
                <Link href="/" className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-800 hover:text-zinc-50 focus:bg-zinc-800 focus:text-zinc-50">
                  Latest
                </Link>
              </NavigationMenuItem>
              {/* Events Link */}
              <NavigationMenuItem>
                <Link href="/events" className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-800 hover:text-zinc-50 focus:bg-zinc-800 focus:text-zinc-50">
                  Events
                </Link>
              </NavigationMenuItem>
              {/* AI Dropdown */}
              <CategoryDropdown 
                title="AI" 
                items={navigationCategories.ai[0].items} 
              />

              {/* Technology Dropdown */}
              <CategoryDropdown 
                title="Technology" 
                items={navigationCategories.technology[0].items} 
              />

              {/* Coding Dropdown */}
              <CategoryDropdown 
                title="Coding" 
                items={navigationCategories.coding[0].items} 
              />

              {/* Security Dropdown */}
              <CategoryDropdown 
                title="Security" 
                items={navigationCategories.security[0].items} 
              />

              {/* Newsletters Dropdown */}
              {/* <CategoryDropdown 
                title="Newsletters" 
                items={navigationCategories.newsletters[0].items} 
              /> */}

            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side items (Search) */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            <div className="hidden items-center lg:flex">
              {isSearchVisible ? (
                <Input
                  type="search"
                  placeholder="Search..."
                  className="h-9 w-[200px] bg-zinc-800 text-zinc-200 placeholder:text-zinc-400"
                  autoFocus
                  onBlur={() => setIsSearchVisible(false)}
                />
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 hover:bg-zinc-800"
                  onClick={() => setIsSearchVisible(true)}
                >
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              )}
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 hover:bg-zinc-800 lg:hidden"
                >
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full bg-zinc-900 text-zinc-200 overflow-y-auto ">
                <ScrollArea className="h-full pr-4">
                  
                  <div className="space-y-6 py-6 ">
                    {/* Mobile Search */}
                    <div className="px-4">
                      <Input
                        type="search"
                        placeholder="Search TechOrb..."
                        className="bg-zinc-800 text-zinc-200 placeholder:text-zinc-400"
                      />
                    </div>

                    {/* Home Link */}
                    <div className="flex flex-wrap mx-3">
                      {/* Main Navigation */}
                      <Link href="/" className="block w-1/2 py-2 text-lg font-medium font-mono hover:text-zinc-50">
                        Latest
                      </Link>
                      <Link href="/news" className="block w-1/2 py-2 text-lg font-medium font-mono hover:text-zinc-50">
                        Tech News
                      </Link>

                      {/* Tech Categories */}
                      <Link href="/web3" className="block w-1/2 py-2 text-lg font-medium font-mono hover:text-zinc-50">
                        Web3
                      </Link>
                      <Link href="/cybersecurity" className="block w-1/2 py-2 text-lg font-medium font-mono hover:text-zinc-50">
                        Cybertech
                      </Link>

                      {/* Developer Resources */}
                      {/* Add more links here as necessary */}

                      {/* Industry & Career */}
                      <Link href="/startups" className="block w-1/2 py-2 text-lg font-medium font-mono hover:text-zinc-50">
                        Startups
                      </Link>

                      {/* Community */}
                      <Link href="/forums" className="block w-1/2 py-2 text-lg font-medium font-mono hover:text-zinc-50">
                        Forums
                      </Link>

                      {/* Resources */}
                      <Link href="/services" className="block w-1/2 py-2 text-lg font-medium font-mono hover:text-zinc-50">
                        Services
                      </Link>
                    </div>

                    <hr className=''></hr>
                    {/* Mobile Dropdowns */}
                    <div className='flex flex-wrap '>
                      <div className="w-1/2  px-2 mb-4">
                      
                        <CategoryDropdown 
                          title="AI" 
                          items={navigationCategories.ai[0].items} 
                          isMobile 
                        />
                      </div>

                      <div className="w-1/2 px-2 mb-4">
                      
                        <CategoryDropdown 
                          title="Technology" 
                          items={navigationCategories.technology[0].items} 
                          isMobile 
                        />
                      </div>

                      <div className="w-1/2 px-2 mb-4">
                      
                        <CategoryDropdown 
                          title="Programming" 
                          items={navigationCategories.coding[0].items} 
                          isMobile 
                        />
                      </div>

                      <div className="w-1/2 px-2 mb-4">
                      
                        <CategoryDropdown 
                          title="Security" 
                          items={navigationCategories.security[0].items} 
                          isMobile 
                        />
                      </div>

                      {/* <div className="w-1/2 px-2 mb-4">
                      
                        <CategoryDropdown 
                          title="Newsletters" 
                          items={navigationCategories.newsletters[0].items} 
                          isMobile 
                        />
                      </div> */}
                    </div>
                    {/* About & Support */}
                    <hr></hr>
                    <div>
                      <span className='px-4 text-xl font-mono '>Let's Orb Together🌍</span>
                      <div className='flex flex-wrap justify-center'> 
                        
                        {/* <Link href="/about" className="block px-4 w-1/4 py-2 text-lg font-medium hover:text-zinc-50">
                          About
                        </Link> */}
                        <Link href="/contact" className="block px-4 w-1/3 py-2 text-lg font-semibold   hover:text-zinc-50">
                          Contact
                        </Link>
                        <Link href="/Services" className="block px-2 w-1/3 py-2 text-lg font-semibold  hover:text-zinc-50">
                          Services
                        </Link>
                        <Link href="/newsletters" className="block pr-6 w-1/3 py-2 text-lg font-semibold  hover:text-zinc-50">
                          Newsletter
                        </Link>
                        {/* <Link href="/Services" className="block px-4 w-1/3 py-2 text-lg font-medium hover:text-zinc-50">
                          Socials
                        </Link> */}
                        {/*<Link href="/wik4" className="block px-4 w-1/4 py-2 text-lg font-medium hover:text-zinc-50">
                          Wik3
                        </Link> */}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;