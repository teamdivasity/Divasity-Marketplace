import { Model, DataTypes, Optional } from 'sequelize';
import { database } from '../config/database';
import { User } from './User';
import { Project } from './Project';

export enum InvestmentStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    FAILED = 'failed',
    REFUNDED = 'refunded',
    CANCELLED = 'cancelled'
}

export enum InvestmentType {
    EQUITY = 'equity',
    DEBT = 'debt',
    CONVERTIBLE = 'convertible',
    REVENUE_SHARE = 'revenue_share',
    DONATION = 'donation'
}

export interface InvestmentAttributes {
    id: string;
    amount: number;
    investorId: string;
    projectId: string;
    type: InvestmentType;
    status: InvestmentStatus;
    transactionHash?: string;
    walletAddress?: string;
    paymentMethod: string;
    paymentReference?: string;
    equityPercentage?: number;
    expectedReturn?: number;
    returnPeriod?: number;
    notes?: string;
    termsAccepted: boolean;
    termsAcceptedAt?: Date;
    confirmedAt?: Date;
    refundedAt?: Date;
    refundReason?: string;
    processingFee: number;
    netAmount: number;
    currency: string;
    exchangeRate?: number;
    riskLevel: string;
    investorExperience: string;
    investorAccredited: boolean;
    dueDiligenceCompleted: boolean;
    contractSigned: boolean;
    contractUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface InvestmentCreationAttributes extends Optional<InvestmentAttributes,
    'id' | 'status' | 'processingFee' | 'netAmount' | 'currency' | 'riskLevel' |
    'investorExperience' | 'investorAccredited' | 'dueDiligenceCompleted' |
    'contractSigned' | 'createdAt' | 'updatedAt'> {}

export class Investment extends Model<InvestmentAttributes, InvestmentCreationAttributes> {
    public id!: string;
    public amount!: number;
    public investorId!: string;
    public projectId!: string;
    public type!: InvestmentType;
    public status!: InvestmentStatus;
    public transactionHash?: string;
    public walletAddress?: string;
    public paymentMethod!: string;
    public paymentReference?: string;
    public equityPercentage?: number;
    public expectedReturn?: number;
    public returnPeriod?: number;
    public notes?: string;
    public termsAccepted!: boolean;
    public termsAcceptedAt?: Date;
    public confirmedAt?: Date;
    public refundedAt?: Date;
    public refundReason?: string;
    public processingFee!: number;
    public netAmount!: number;
    public currency!: string;
    public exchangeRate?: number;
    public riskLevel!: string;
    public investorExperience!: string;
    public investorAccredited!: boolean;
    public dueDiligenceCompleted!: boolean;
    public contractSigned!: boolean;
    public contractUrl?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Associations
    public investor?: User;
    public project?: Project;

    get isActive(): boolean {
        return this.status === InvestmentStatus.CONFIRMED;
    }

    get isPending(): boolean {
        return this.status === InvestmentStatus.PENDING;
    }

    get canBeRefunded(): boolean {
        return this.status === InvestmentStatus.CONFIRMED && 
               this.project?.status !== 'completed';
    }

    get processingFeePercentage(): number {
        return this.amount > 0 ? (this.processingFee / this.amount) * 100 : 0;
    }

    get investmentAge(): number {
        const now = new Date();
        const created = new Date(this.createdAt);
        return Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    }
}

Investment.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        validate: {
            min: 1,
            max: 1000000
        }
    },
    investorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    projectId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Project',
            key: 'id'
        }
    },
    type: {
        type: DataTypes.ENUM(...Object.values(InvestmentType)),
        allowNull: false,
        defaultValue: InvestmentType.EQUITY
    },
    status: {
        type: DataTypes.ENUM(...Object.values(InvestmentStatus)),
        allowNull: false,
        defaultValue: InvestmentStatus.PENDING
    },
    transactionHash: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    walletAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['crypto', 'bank_transfer', 'card', 'paypal', 'stripe']]
        }
    },
    paymentReference: {
        type: DataTypes.STRING,
        allowNull: true
    },
    equityPercentage: {
        type: DataTypes.DECIMAL(5, 4),
        allowNull: true,
        validate: {
            min: 0,
            max: 100
        }
    },
    expectedReturn: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        validate: {
            min: 0
        }
    },
    returnPeriod: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 1,
            max: 120
        }
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: [0, 1000]
        }
    },
    termsAccepted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    termsAcceptedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    confirmedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    refundedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    refundReason: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    processingFee: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    netAmount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'USD',
        validate: {
            isIn: [['USD', 'EUR', 'GBP', 'BTC', 'ETH', 'IOTA', 'NGN']]
        }
    },
    exchangeRate: {
        type: DataTypes.DECIMAL(15, 8),
        allowNull: true,
        validate: {
            min: 0
        }
    },
    riskLevel: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'medium',
        validate: {
            isIn: [['low', 'medium', 'high', 'very_high']]
        }
    },
    investorExperience: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'beginner',
        validate: {
            isIn: [['beginner', 'intermediate', 'advanced', 'expert']]
        }
    },
    investorAccredited: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    dueDiligenceCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    contractSigned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    contractUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true
        }
    }
}, {
    sequelize: database,
    tableName: 'Investment',
    timestamps: true,
    indexes: [
        {
            fields: ['investorId']
        },
        {
            fields: ['projectId']
        },
        {
            fields: ['status']
        },
        {
            fields: ['type']
        },
        {
            fields: ['createdAt']
        },
        {
            fields: ['confirmedAt']
        },
        {
            unique: true,
            fields: ['investorId', 'projectId', 'createdAt']
        }
    ],
    hooks: {
        beforeCreate: (investment: Investment) => {
            // Calculate processing fee (2.5% of investment amount)
            investment.processingFee = investment.amount * 0.025;
            investment.netAmount = investment.amount - investment.processingFee;
        },
        beforeUpdate: (investment: Investment) => {
            if (investment.changed('amount')) {
                investment.processingFee = investment.amount * 0.025;
                investment.netAmount = investment.amount - investment.processingFee;
            }
        }
    }
});

// Define associations
Investment.belongsTo(User, { foreignKey: 'investorId', as: 'investor' });
Investment.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });
User.hasMany(Investment, { foreignKey: 'investorId', as: 'investments' });
Project.hasMany(Investment, { foreignKey: 'projectId', as: 'investments' });

export default Investment;