export interface Ticket {
    subject: string;
    comment: {
        body: string;
    };
    comments: Array<{
        body: string;
    }>;
}

export interface CategorizedTicket extends Ticket {
    category: string;
    priority: number;
}

const keywords = {
    // Prioridade 1: Autenticação/Financeiro
    p1: {
        category: "Autenticação/Financeiro",
        priority: 1,
        terms: [
            // Autenticação
            'login', 'senha', '2fa', 'locked', 'locked out', 'reset my password', 'account locked',
            // Financeiro
            'failed payment', 'charge pending', 'charge', 'cobrança', 'store credit', 'gift card',
            'promo code rejected', 'promoção', 'cupom', 'price adjustment', 'ajuste preço',
            'refund', 'reembolso', 'payment failed', 'pagamento'
        ]
    },
    // Prioridade 2: Logística/Produto
    p2: {
        category: "Logística/Produto",
        priority: 2,
        terms: [
            // Logística
            'entrega', 'atraso', 'delayed package', 'tracking stuck', 'tracking', 'rastreamento',
            'pacote perdido', 'delivered but nothing here', 'shipment', 'tracking says label created',
            // Produto
            'return request', 'return', 'devolução', 'exchange', 'troca', 'wrong item',
            'damaged item', 'defeito', 'danificado', 'missing parts', 'falta peça',
            'too small', 'didn\'t fit', 'scratched'
        ]
    },
    // Prioridade 3: Preferência/Comercial
    p3: {
        category: "Preferência/Comercial",
        priority: 3,
        terms: [
            'update address', 'change shipping address', 'adicionar item', 'add an item',
            'cancel', 'cancelar', 'refuse delivery', 'swap sizes'
        ]
    }
};

export function categorizeTicket(ticket: Ticket): CategorizedTicket {
    const allText = `${ticket.subject} ${ticket.comment.body} ${ticket.comments.map(c => c.body).join(' ')}`.toLowerCase();
    for (const key of ['p1', 'p2', 'p3']) {
        const priorityBlock = keywords[key as keyof typeof keywords];
        
        for (const term of priorityBlock.terms) {
            if (allText.includes(term)) {
                return {
                    ...ticket,
                    category: priorityBlock.category,
                    priority: priorityBlock.priority,
                };
            }
        }
    }

    return {
        ...ticket,
        category: "Outros",
        priority: 3,
    };
}