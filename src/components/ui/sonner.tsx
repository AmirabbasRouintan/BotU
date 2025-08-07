import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background/50 group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:backdrop-blur-xl group-[.toaster]:border",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      style={
        {
          "--normal-bg": "transparent",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "transparent",
          "--success-text": "#ffffff",
          "--success-border": "#0e8b8b",
          "--error-bg": "transparent",
          "--error-text": "#ffffff",
          "--error-border": "#b91c1c",
          "--warning-bg": "transparent",
          "--warning-text": "#ffffff",
          "--warning-border": "#d97706",
          "--info-bg": "transparent",
          "--info-text": "#ffffff",
          "--info-border": "#2563eb",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }