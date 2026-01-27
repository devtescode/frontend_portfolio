const SkillCard = ({ icon: Icon, name, level, color = 'primary' }) => {
  return (
    <div className="glass-card p-6 rounded-2xl hover-lift group">
      <div className={`w-14 h-14 rounded-xl bg-${color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        {Icon && <Icon className={`w-7 h-7 text-primary`} />}
      </div>
      <h3 className="font-semibold mb-2">{name}</h3>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
          style={{ width: `${level}%` }}
        />
      </div>
      <p className="text-sm text-muted-foreground mt-2">{level}%</p>
    </div>
  );
};

export default SkillCard;
