import React from 'react';
import { Grid2, Card, CardContent, Typography, Divider } from '@mui/material';
import { colores } from '../../../styles/colors';

interface Politica {
    titulo: string;
    contenido: string[];
}

export const PoliticasUso: React.FC = () => {
    const politicas: Politica[] = [
        {
            titulo: 'Conductor',
            contenido: [
                'Edad mínima y máxima',
                'Licencia de conducir válida',
                'Conductores adicionales (si aplica)',
            ],
        },
        {
            titulo: 'Uso del Vehículo',
            contenido: [
                'Área de conducción permitida',
                'Propósito del uso (personal, no comercial)',
                'Número máximo de pasajeros',
                'Política sobre mascotas',
                'Prohibido fumar',
            ],
        },
        {
            titulo: 'Cuidado del Vehículo',
            contenido: [
                'Verificación de fluidos y neumáticos',
                'Reportar problemas mecánicos',
                'Devolver en condiciones razonablemente limpias',
                'Responsabilidad por daños (franquicia)',
            ],
        },
        {
            titulo: 'Devolución del Vehículo',
            contenido: [
                'Lugar y hora de devolución especificados',
                'Política de combustible',
                'Retirar objetos personales',
            ],
        },
        {
            titulo: 'Pagos y Cargos',
            contenido: [
                'Tarifas de alquiler e impuestos',
                'Cargos adicionales (conductores, equipos, etc.)',
                'Depósito de seguridad',
                'Formas de pago aceptadas',
            ],
        },
        {
            titulo: 'Seguros y Responsabilidad',
            contenido: [
                'Seguro básico incluido',
                'Seguros opcionales (CDW, TP, PAI, SLI)',
                'Responsabilidad del arrendatario',
            ],
        },
        {
            titulo: 'Otras Consideraciones',
            contenido: [
                'Procedimiento en caso de accidente o robo',
                'Responsabilidad por infracciones de tráfico',
                'Prohibido modificar el vehículo',
                'Prohibido subarrendar',
            ],
        },
        {
            titulo: 'Contrato de Alquiler',
            contenido: [
                'Leer y comprender los términos y condiciones',
                'Preguntar cualquier duda antes de firmar',
            ],
        },
    ];

    const dividirEnColumnas = (array: Politica[], columnas: number): Politica[][] => {
        const resultado: Politica[][] = [];
        const elementosPorColumna = Math.ceil(array.length / columnas);
        for (let i = 0; i < columnas; i++) {
            resultado.push(array.slice(i * elementosPorColumna, (i + 1) * elementosPorColumna));
        }
        return resultado;
    };

    const columnasDePoliticas: Politica[][] = dividirEnColumnas(politicas, 4);

    return (
        <div> {/* Reemplazamos Container por un div simple */}
            <Divider sx={{ borderColor: colores.AntiFlashWhite, margin: "10px" }} />
            <Typography variant="h5" component="h2" margin={"20px 10px 10px 10px"} color={colores.Saffron} sx={{ textDecoration: "underline" }}>
                Políticas de Uso del Vehículo
            </Typography>
            <Grid2 container spacing={0} margin={"20px 10px 10px 10px"}>
                {columnasDePoliticas.map((columna, index) => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                        {columna.map((politica, idx) => (
                            <Card key={idx} sx={{ mb: 2, minHeight: "200px", backgroundColor: colores.PennBlue, color: colores.AntiFlashWhite }} >
                                <CardContent>
                                    <Typography variant="h6" gutterBottom color={colores.Saffron}>
                                        {politica.titulo}
                                    </Typography>
                                    <ul>
                                        {politica.contenido.map((item, i) => (
                                            <li key={i}>
                                                <Typography variant="body2">{item}</Typography>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </Grid2>
                ))}
            </Grid2>
        </div>
    );
};

