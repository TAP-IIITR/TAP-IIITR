import { Card, CardContent, CardHeader } from "./ui/card";

interface AlumniCardProps {
    image: string;
    name: string;
    lpa: string;
    company: string;
}
const AlumniCard = ({ image, name, lpa, company }: AlumniCardProps) => {
    return (
        <Card>
            <CardHeader>
                <img className="rounded-md" src={image} alt="" />
            </CardHeader>
            <CardContent className="flex items-center flex-col">
                <h1 className="font-semibold text-lg">{name}</h1>
                <p className="text-purpleColor">{company} {lpa}</p>
            </CardContent>
        </Card>
    )
}
export default AlumniCard