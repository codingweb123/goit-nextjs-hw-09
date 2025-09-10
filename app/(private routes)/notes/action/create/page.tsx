import NoteForm from "@/components/NoteForm/NoteForm"
import css from "./CreateNote.module.css"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "NoteHub - Share Notes Instantly Online",
	description: `Easily create and share new notes with Notehub. Write, organize, and publish your ideas in seconds.`,
	openGraph: {
		title: "NoteHub - Share Notes Instantly Online",
		description: `Easily create and share new notes with Notehub. Write, organize, and publish your ideas in seconds.`,
		siteName: "NoteHub",
		type: "website",
		images: [
			{
				url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
				width: 1200,
				height: 630,
				alt: "NoteHub - Share Notes Instantly Online",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "NoteHub - Share Notes Instantly Online",
		description: `Easily create and share new notes with Notehub. Write, organize, and publish your ideas in seconds.`,
		images: [
			{
				url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
				width: 1200,
				height: 630,
				alt: "NoteHub - Share Notes Instantly Online",
			},
		],
		creator: "github.com/codingweb123",
	},
}

const CreateNote = async () => {
	return (
		<main className={css.main}>
			<div className={css.container}>
				<h1 className={css.title}>Create note</h1>
				<NoteForm />
			</div>
		</main>
	)
}

export default CreateNote
