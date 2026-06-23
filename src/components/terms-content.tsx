export function TermsContent() {
  return (
    <div className="flex flex-col gap-field">
      <h1 className="text-center text-primary font-bold text-2xl">
        TERMINOS Y CONDICIONES DE USO DEL SERVICIO DE PLAZAS Y PARQUES
        CONECTADOS
      </h1>

      <Section
        title="Objeto"
        body="El presente documento establece los terminos y condiciones que regulan el acceso y uso del servicio de conexion a internet inalambrica (WiFi) gratuito provisto por el Municipio en parques, plazas y espacios publicos municipales. El acceso a la red implica la aceptacion plena de estos terminos por parte del usuario."
      />

      <Section
        title="Alcance del servicio"
        body={
          <>
            El servicio de WiFi libre tiene como objetivo facilitar el acceso a
            internet en espacios publicos para promover la inclusion digital, la
            comunicacion y el uso de servicios digitales.
            <br />
            <br />
            La red estara disponible en los parques y plazas determinados por el
            Municipio y podra tener limitaciones de velocidad, disponibilidad,
            tiempo de conexion o cantidad de dispositivos conectados
            simultaneamente.
            <br />
            <br />
            El Municipio podra modificar, suspender o interrumpir el servicio
            total o parcialmente, en forma temporal o permanente, sin necesidad
            de notificacion previa, cuando razones tecnicas, operativas, de
            seguridad o de mantenimiento asi lo requieran.
          </>
        }
      />

      <Section
        title="Responsabilidad del usuario"
        body={
          <>
            El Municipio no asume responsabilidad alguna por los danos,
            perjuicios o perdidas que pudieran derivarse directa o indirectamente
            del uso del servicio.
            <br />
            <br />
            El usuario reconoce que el acceso a internet mediante redes publicas
            implica riesgos inherentes en materia de seguridad informatica, por
            lo que acepta utilizar el servicio bajo su exclusiva responsabilidad.
            <br />
            <br />
            El Municipio actua exclusivamente como proveedor de acceso a la red y
            no ejerce control previo sobre los contenidos que circulan a traves
            de internet.
            <br />
            <br />
            El usuario es el unico responsable del uso que realice del servicio
            de WiFi y de los contenidos a los que acceda, descargue o comparta a
            traves de la red.
            <br />
            <br />
            Asimismo, el usuario es responsable de la seguridad de su
            dispositivo, la proteccion de sus datos personales y la informacion
            que transmita.
            <br />
            <br />
            Se recomienda evitar la transmision de informacion sensible o
            confidencial a traves de redes publicas.
          </>
        }
      />

      <Section
        title="Actividades prohibidas"
        body={
          <>
            Queda expresamente prohibido utilizar el servicio para:
            <br />
            <br />- Acceder, descargar, almacenar o distribuir contenidos
            ilegales, ofensivos, discriminatorios, violentos o que vulneren
            derechos de terceros.
            <br />- Infringir derechos de propiedad intelectual o industrial.
            <br />- Intentar acceder sin autorizacion a sistemas, redes o datos
            de terceros.
            <br />- Realizar actividades que puedan afectar la seguridad,
            estabilidad o funcionamiento de la red.
            <br />- Difundir virus, malware u otros programas informaticos
            daninos.
            <br />- Utilizar la red para enviar spam, realizar fraudes o
            suplantacion de identidad.
            <br />- Desarrollar actividades comerciales intensivas que afecten
            la disponibilidad del servicio para otros usuarios.
          </>
        }
      />

      <Section
        title="Limitacion de responsabilidad del Municipio"
        body={
          <>
            El Municipio no sera responsable por:
            <br />
            <br />- Interrupciones, fallas o limitaciones del servicio.
            <br />- Perdida de informacion o danos en dispositivos derivados del
            uso de la red.
            <br />- Contenidos, servicios o sitios web a los que accedan los
            usuarios.
            <br />- Danos o perjuicios derivados del uso indebido del servicio
            por parte de terceros.
            <br />
            <br />
            El usuario acepta utilizar el servicio bajo su propia y exclusiva
            responsabilidad.
          </>
        }
      />

      <Section
        title="Privacidad y tratamiento de datos"
        body={
          <>
            El usuario declara haber sido informado de manera clara, expresa y
            suficiente acerca del tratamiento de sus datos personales en el
            marco del uso del servicio de WiFi publico provisto por el
            Municipio. En tal sentido, al acceder y utilizar el servicio, el
            usuario presta su consentimiento libre, expreso e informado para que
            el Municipio recopile, registre, almacene, utilice y procese los
            datos personales y datos tecnicos de conexion que resulten
            necesarios para la prestacion, administracion, monitoreo y seguridad
            del servicio.
            <br />
            <br />
            El usuario acepta que dichos datos podran incluir informacion de
            identificacion personal, datos de contacto y datos tecnicos
            vinculados a la conexion, tales como direccion IP, identificador del
            dispositivo, fecha, hora y duracion de la conexion, asi como
            cualquier otro dato necesario para la correcta operacion del
            sistema.
            <br />
            <br />
            Asimismo, en caso de implementarse mecanismos de verificacion de
            identidad mediante escaneo del Documento Nacional de Identidad (DNI)
            o sistemas de reconocimiento facial u otras tecnologias biometricas,
            el usuario presta su consentimiento para el tratamiento de dichos
            datos con la unica finalidad de validar su identidad, permitir el
            acceso al servicio y prevenir usos indebidos de la red.
            <br />
            <br />
            El tratamiento de los datos personales se realizara conforme a lo
            establecido por la Ley 25.326 de Proteccion de Datos Personales y
            demas normativa aplicable, adoptandose las medidas de seguridad
            necesarias para garantizar su confidencialidad e integridad.
            <br />
            <br />
            El usuario reconoce que podra ejercer en cualquier momento los
            derechos de acceso, rectificacion, actualizacion y supresion de sus
            datos personales conforme a la normativa vigente.
          </>
        }
      />

      <Section
        title="Modificaciones de los terminos y condiciones"
        body="El Municipio se reserva el derecho de modificar los presentes terminos y condiciones en cualquier momento, publicando las actualizaciones en los medios que considere pertinentes."
      />

      <Section
        title="Aceptacion"
        body="El acceso y uso del servicio de WiFi libre implica la aceptacion expresa de los presentes terminos y condiciones por parte del usuario."
      />
    </div>
  );
}

function Section({ title, body }: { title: string; body: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-1.5">
      <h2 className="text-primary font-bold text-2xl">{title}</h2>
      <p className="text-primary font-normal text-lg">{body}</p>
    </section>
  );
}
