import { Card, CardContent, CardHeader } from "./ui/card";

interface AlumniCardProps {
    image: string;
    name: string;
    company: string;
}
const AlumniCard = ({ image, name, company }: AlumniCardProps) => {
    return (
        <Card className="m-4">
            <CardHeader>
                <img className="rounded-md" src={image} alt="" />
            </CardHeader>
            <CardContent className="flex items-center flex-col">
                <h1 className="font-semibold text-lg">{name}</h1>
                <p className="text-purpleColor">{company}</p>
            </CardContent>
        </Card>
    )
}
export default AlumniCard