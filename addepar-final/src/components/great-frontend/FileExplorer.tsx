import { useState, type FC } from "react";

type FileType = {
    id: number,
    name: string,
    children: FileType[]
}

const sortFiles = (files: FileType[]): FileType[] =>
    [...files].sort((a, b) => {
        const aIsFolder = Array.isArray(a.children) && a.children.length > 0;
        const bIsFolder = Array.isArray(b.children) && b.children.length > 0;
        if (aIsFolder && !bIsFolder) return -1; // a before b if a is folder, b is not
        if (!aIsFolder && bIsFolder) return 1; // b before a if b is folder, a is not
        return a.name.localeCompare(b.name); // else if both the same type, sort alphabetically
    });

const FileExplorer: FC<{files: FileType[]}> = ({files}) => {
    const sortedFiles = sortFiles(files);

    return (
        <div style={{textAlign: "left"}}>
            <h1>File Explorer</h1>
            {sortedFiles.map((file) => (
                <FileNode key={file.id} file={file} depth={0} />
            ))}
        </div>
    )
}

const FileNode: FC<{ file: FileType; depth?: number }> = ({ file, depth = 0 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isFolder = Array.isArray(file.children);

    const handleFolderClick = () => {
        setIsOpen((prev: boolean) => !prev);
    }

    return (
        <div>
            <div style={{ paddingLeft: `${depth * 1.5}rem` }}>
                {!isFolder && (
                    <p>{file.name}</p>
                )}
                {isFolder && (
                    <a onClick={handleFolderClick} style={{ cursor: "pointer" }}>{file.name}</a>
                )}
            </div>
            {isFolder && isOpen && (
                sortFiles(file.children ?? []).map((child) =>
                <FileNode key={child.id} file={child} depth={depth + 1} />
            ))}
        </div>
    )
}

export default FileExplorer;