import { Model, DataTypes, Optional } from 'sequelize';
import { database } from '../config/database';
import { User } from './User';

export enum ProjectStatus {
    DRAFT = 'draft',
    ACTIVE = 'active',
    FUNDED = 'funded',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
}

export enum ProjectCategory {
    TECHNOLOGY = 'technology',
    HEALTHCARE = 'healthcare',
    EDUCATION = 'education',
    FINTECH = 'fintech',
    AGRICULTURE = 'agriculture',
    RENEWABLE_ENERGY = 'renewable_energy',
    ECOMMERCE = 'ecommerce',
    SOCIAL_IMPACT = 'social_impact',
    ENTERTAINMENT = 'entertainment',
    REAL_ESTATE = 'real_estate',
    MANUFACTURING = 'manufacturing',
    OTHER = 'other'
}

export interface ProjectAttributes {
    id: string;
    title: string;
    description: string;
    shortDescription: string;
    category: ProjectCategory;
    tags: string;
    fundingGoal: number;
    currentFunding: number;
    minimumInvestment: number;
    maximumInvestment?: number;
    deadline: Date;
    status: ProjectStatus;
    images: string;
    documents: string;
    businessPlan?: string;
    pitchDeck?: string;
    financialProjections?: string;
    teamMembers: string;
    milestones: string;
    riskFactors?: string;
    marketAnalysis?: string;
    competitiveAdvantage?: string;
    revenueModel?: string;
    useOfFunds?: string;
    exitStrategy?: string;
    socialImpact?: string;
    environmentalImpact?: string;
    intellectualProperty?: string;
    legalStructure?: string;
    regulatoryCompliance?: string;
    investorPerks?: string;
    equityOffered?: number;
    valuationCap?: number;
    discountRate?: number;
    investorCount: number;
    viewCount: number;
    likeCount: number;
    shareCount: number;
    commentCount: number;
    creatorId: string;
    isPublic: boolean;
    isFeatured: boolean;
    isVerified: boolean;
    verifiedAt?: Date;
    verifiedBy?: string;
    rejectionReason?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProjectCreationAttributes extends Optional<ProjectAttributes, 
    'id' | 'currentFunding' | 'investorCount' | 'viewCount' | 'likeCount' | 
    'shareCount' | 'commentCount' | 'isPublic' | 'isFeatured' | 'isVerified' | 
    'createdAt' | 'updatedAt'> {}

export class Project extends Model<ProjectAttributes, ProjectCreationAttributes> {
    public id!: string;
    public title!: string;
    public description!: string;
    public shortDescription!: string;
    public category!: ProjectCategory;
    public tags!: string;
    public fundingGoal!: number;
    public currentFunding!: number;
    public minimumInvestment!: number;
    public maximumInvestment?: number;
    public deadline!: Date;
    public status!: ProjectStatus;
    public images!: string;
    public documents!: string;
    public businessPlan?: string;
    public pitchDeck?: string;
    public financialProjections?: string;
    public teamMembers!: string;
    public milestones!: string;
    public riskFactors?: string;
    public marketAnalysis?: string;
    public competitiveAdvantage?: string;
    public revenueModel?: string;
    public useOfFunds?: string;
    public exitStrategy?: string;
    public socialImpact?: string;
    public environmentalImpact?: string;
    public intellectualProperty?: string;
    public legalStructure?: string;
    public regulatoryCompliance?: string;
    public investorPerks?: string;
    public equityOffered?: number;
    public valuationCap?: number;
    public discountRate?: number;
    public investorCount!: number;
    public viewCount!: number;
    public likeCount!: number;
    public shareCount!: number;
    public commentCount!: number;
    public creatorId!: string;
    public isPublic!: boolean;
    public isFeatured!: boolean;
    public isVerified!: boolean;
    public verifiedAt?: Date;
    public verifiedBy?: string;
    public rejectionReason?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Custom getters for JSON fields
    get tagsArray(): string[] {
        return this.tags ? JSON.parse(this.tags) : [];
    }

    get imagesArray(): string[] {
        return this.images ? JSON.parse(this.images) : [];
    }

    get documentsArray(): string[] {
        return this.documents ? JSON.parse(this.documents) : [];
    }

    get teamMembersArray(): any[] {
        return this.teamMembers ? JSON.parse(this.teamMembers) : [];
    }

    get milestonesArray(): any[] {
        return this.milestones ? JSON.parse(this.milestones) : [];
    }

    get fundingProgress(): number {
        return this.fundingGoal > 0 ? (this.currentFunding / this.fundingGoal) * 100 : 0;
    }

    get daysRemaining(): number {
        const now = new Date();
        const deadline = new Date(this.deadline);
        const diffTime = deadline.getTime() - now.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    get isActive(): boolean {
        return this.status === ProjectStatus.ACTIVE && this.daysRemaining > 0;
    }

    get isFunded(): boolean {
        return this.currentFunding >= this.fundingGoal;
    }
}

Project.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [10, 200],
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [100, 10000],
            notEmpty: true
        }
    },
    shortDescription: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [50, 300],
            notEmpty: true
        }
    },
    category: {
        type: DataTypes.ENUM(...Object.values(ProjectCategory)),
        allowNull: false
    },
    tags: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '[]'
    },
    fundingGoal: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        validate: {
            min: 1000,
            max: 10000000
        }
    },
    currentFunding: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    minimumInvestment: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        validate: {
            min: 100
        }
    },
    maximumInvestment: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        validate: {
            min: 100
        }
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isAfter: new Date().toISOString()
        }
    },
    status: {
        type: DataTypes.ENUM(...Object.values(ProjectStatus)),
        allowNull: false,
        defaultValue: ProjectStatus.DRAFT
    },
    images: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '[]'
    },
    documents: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '[]'
    },
    businessPlan: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pitchDeck: {
        type: DataTypes.STRING,
        allowNull: true
    },
    financialProjections: {
        type: DataTypes.STRING,
        allowNull: true
    },
    teamMembers: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '[]'
    },
    milestones: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '[]'
    },
    riskFactors: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    marketAnalysis: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    competitiveAdvantage: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    revenueModel: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    useOfFunds: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    exitStrategy: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    socialImpact: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    environmentalImpact: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    intellectualProperty: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    legalStructure: {
        type: DataTypes.STRING,
        allowNull: true
    },
    regulatoryCompliance: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    investorPerks: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    equityOffered: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
            min: 0,
            max: 100
        }
    },
    valuationCap: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        validate: {
            min: 0
        }
    },
    discountRate: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
            min: 0,
            max: 50
        }
    },
    investorCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    viewCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    likeCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    shareCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    commentCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    creatorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    isPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    isFeatured: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    verifiedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    verifiedBy: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    rejectionReason: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize: database,
    tableName: 'Project',
    timestamps: true,
    indexes: [
        {
            fields: ['creatorId']
        },
        {
            fields: ['category']
        },
        {
            fields: ['status']
        },
        {
            fields: ['deadline']
        },
        {
            fields: ['isFeatured']
        },
        {
            fields: ['isVerified']
        },
        {
            fields: ['createdAt']
        }
    ]
});

// Define associations
Project.belongsTo(User, { foreignKey: 'creatorId', as: 'creator' });
User.hasMany(Project, { foreignKey: 'creatorId', as: 'projects' });

export default Project;