import UnauthorizedContent from './unauthorized-content'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center p-4">
      <UnauthorizedContent />
    </div>
  )
}