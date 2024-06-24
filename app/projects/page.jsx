import Link from "next/link";
import { getExperiment } from "@/sanity/sanity.query";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import GradualSpacing from "@/src/components/ui/gradual-spacing";

export default async function Project() {
  const projects = await getExperiment();

  const sideBar = [
    {
      name: "Protocols",
      icon: FlaskRoundIcon,
      href: "#",
    },
    {
      name: "Analytics",
      icon: BarChartIcon,
      href: "#",
    },
    {
      name: "Settings",
      icon: SettingsIcon,
      href: "#",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-muted text-muted-foreground">
      <div className="flex flex-row">
        <nav className="bg-muted-foreground/5 border-r border-muted-foreground/10 p-4 md:flex flex-col gap-2 shrink-0 md:p-6 hidden">
          {
            sideBar.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted-foreground/10"
                prefetch={false}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))
          }
        </nav>

          <div className="flex flex-col">
            <section className="max-w-2xl md:mb-0 mx-10 p-2 py-3 flex flex-col mt-4">
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight">
              {/* <GradualSpacing text="Vibrations RT-Labs Experiments" className="grotesk"/>   */}
                Vibrations RT-Labs Experiments
              </h1>
              <p className="text-base text-zinc-400 leading-relaxed">
                These are some experiments developed in-house at NITK that can be used for testing the setup.
              </p>
            </section>

            <div className="flex flex-1">
              <div className="flex-1 p-4 md:p-6">
                <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {projects.map((project) => (
                    <Link
                      href={`/projects/${project.slug}`}
                      key={project._id}
                      className="flex items-center gap-x-4 bg-[#1d1d20] border border-transparent hover:border-zinc-700 p-4 rounded-lg ease-in-out"
                    >
                      <Card className="group hover:bg-muted-foreground/10 transition-colors">
                        <CardHeader>
                          <CardTitle>{project.name}</CardTitle>
                          <div className="text-xs text-muted-foreground mt-2">
                            <span className="bg-green-500 text-green-50 px-2 py-1 rounded-full">Running</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {project.tagline}
                          </p>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="group-hover:bg-muted-foreground/20 transition-colors">
                            <EyeIcon className="w-5 h-5" />
                            <span className="sr-only">View details</span>
                          </Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </section>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}



function BarChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  )
}


function BeakerIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 3h15" />
      <path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" />
      <path d="M6 14h12" />
    </svg>
  )
}


function EyeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  )
}


function FlaskRoundIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 2v7.31" />
      <path d="M14 9.3V1.99" />
      <path d="M8.5 2h7" />
      <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
      <path d="M5.52 16h12.96" />
    </svg>
  )
}


function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}