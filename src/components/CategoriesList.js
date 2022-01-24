import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Stack from "@mui/material/Stack"

const CategoriesList = ({ categories }) => {
	return (
		<Stack direction="row" spacing={1} className="hide-scrollbar">
			{categories.map((item, index) => (
				<Button
					key={index}
					as={Link}
					to={`/category/${item.id}/movies`}
					variant="outline-danger"
					className="px-2"
					style={{ borderRadius: "25px", minWidth: "fit-content" }}
				>
					{item.NAME}
				</Button>
			))}
		</Stack>
	)
}

export default CategoriesList
