import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip'; // Import Chip
import { toAbsoluteUrl } from '../../../helpers';

const TeamCard = ({ team, matchOutcome }) => {
    const placeholderLogo = toAbsoluteUrl('/media/custom icon/na.jpg');
    const logoPath = team?.logo ? `${process.env.REACT_APP_API_URL}/${team.logo}` : placeholderLogo;

    // Style for the Chip component
    const chipStyle = {
        marginTop: '8px',
        fontWeight: 'bold',
    };

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 200, textAlign: 'center', padding: '3px' }}>
            <CardMedia
                component="img"
                sx={{ width: 60, height: 60, mb: 1 }}
                image={logoPath}
                alt={`${team?.name || 'TBD'} Logo`}
            />
            <CardContent sx={{ padding: '8px', textAlign: 'center' }}>
                <Typography variant="subtitle1" component="div" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                    {team?.name || 'TBD'}
                </Typography>
                {/** 
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem' }}>
                    {team?.location || 'N/A'}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem', fontWeight: 'fontWeightMedium' }}>
                    Division: {team?.division || 'N/A'}
                </Typography>
                */}
                {/* Conditionally render the match outcome with Chip for stylish appearance */}
                {matchOutcome && (
                    <Chip
                        label={matchOutcome === 'winner' ? 'Won' : 'Lost'}
                        sx={{
                            ...chipStyle,
                            backgroundColor: matchOutcome === 'winner' ? '#4caf50' : '#f44336',
                            color: 'white',
                            borderRadius: '4px',
                            padding: '4px 12px',
                        }}
                    />
                )}
            </CardContent>
        </Card>
    );
};

export default TeamCard;
