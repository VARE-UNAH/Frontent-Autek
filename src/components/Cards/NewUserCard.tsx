import React from 'react'
import { Button } from "@nextui-org/react"
import { Plus, TypeIcon as type, LucideIcon } from 'lucide-react'

interface NewUserContentProps {
  title: string
  description: string
  buttonText: string
  icon: LucideIcon
}

export const NewUserContent: React.FC<NewUserContentProps> = ({ title, description, buttonText, icon: Icon }) => (
  <div className="text-center p-6">
    <Icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <Button color="primary" endContent={<Plus size={20} />}>
      {buttonText}
    </Button>
  </div>
)