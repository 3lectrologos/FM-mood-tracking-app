interface EmailTemplateProps {
  url: string
}

export function LoginEmailTemplate({ url }: EmailTemplateProps) {
  return (
    <div>
      <p>Use this link to log in to Mood Tracker</p>
      <a href={url}>{url}</a>
    </div>
  )
}
