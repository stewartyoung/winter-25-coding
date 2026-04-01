import type { FC } from "react";
import files from "../data/files";
import FileExplorer from "../components/great-frontend/FileExplorer";

const FilesPage: FC = () => {
    return (
        <>
            <FileExplorer files={files} />
        </>
    )
}

export default FilesPage;