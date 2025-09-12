import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const KPICard = ({ title, value, icon: Icon, description }) => {
  return (
    <Card className="kpi-card group cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold text-foreground"
            >
              {value}
            </motion.div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className={cn(
                "p-3 rounded-lg transition-colors group-hover:scale-110",
                "bg-primary/10 text-primary"
              )}
            >
              <Icon className="h-6 w-6" />
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICard;
