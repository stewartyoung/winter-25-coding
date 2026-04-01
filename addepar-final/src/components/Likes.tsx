import { useState } from "react"

function Likes() {
	const [likes, setLikes] = useState(0)
	
	const handleClick = () => {
		setLikes(likes + 1)
    }
	
	return (
		<button onClick={handleClick}>
			Likes: {likes}
		</button>
	)
}

export default Likes;